const { StaleElementReferenceError } = require('selenium-webdriver').error;

class AxeInjector {
  constructor({ driver, config, axeSource = null }) {
    this.driver = driver;
    this.axeSource = axeSource || require('axe-core').source;
    this.config = config ? JSON.stringify(config) : '';

    this.didLogError = false;
    this.errorHandler = this.errorHandler.bind(this);
  }

  // Single-shot error handler. Ensures we don't log more than once.
  errorHandler(err) {
    // We've already "warned" the user. No need to do it again (mostly for backwards compatiability)
    if (this.didLogError) {
      return;
    }

    this.didLogError = true;
    if (err instanceof StaleElementReferenceError) {
      // eslint-disable-next-line no-console
      console.error('Tried to inject into a removed iframe. Please ensure the page has settled.')
    } else {
      // eslint-disable-next-line no-console
      console.error('Failed to inject axe-core into one of the iframes!');
    }
  }

  // Get axe-core source (and configuration)
  get script() {
    return `
      ${this.axeSource}
      ${this.config ? `axe.configure(${this.config})` : ''}
      axe.configure({ branding: { application: 'webdriverjs' } })
    `;
  }

  // Inject into the provided `frame` and its child `frames`
  async handleFrame(frame) {
    // Switch context to the frame and inject our `script` into it
    await this.driver.switchTo().frame(frame);
    await this.driver.executeScript(this.script);

    // Get all of <iframe>s at this level
    const frames = await this.driver.findElements({ tagName: 'iframe' });

    // Inject into each frame. Handling errors to ensure an issue on a single frame won't stop the rest of the injections.
    return Promise.all(
      frames.map(childFrame =>
        this.handleFrame(childFrame).catch(this.errorHandler)
      )
    );
  }

  // Inject into all frames.
  async injectIntoAllFrames() {
    // Ensure we're "starting" our loop at the top-most frame
    await this.driver.switchTo().defaultContent();

    // Inject the script into the top-level
    // XXX: if this `executeScript` fails, we *want* to error, as we cannot run axe-core.
    await this.driver.executeScript(this.script);

    // Get all of <iframe>s at this level
    const frames = await this.driver.findElements({ tagName: 'iframe' });

    // Inject the script into all child frames. Handle errors to ensure we don't stop execution if we fail to inject.
    await Promise.all(
      frames.map(childFrame =>
        this.handleFrame(childFrame).catch(this.errorHandler)
      )
    );

    // Move back to the top-most frame
    return this.driver.switchTo().defaultContent();
  }

  // Inject axe, invoking the provided callback when done
  inject(callback) {
    this.injectIntoAllFrames()
      .then(() => callback())
      // For now, we intentionally ignore errors here, as
      // allowing them to bubble up would be a breaking change.
      .catch(() => callback());
  }
}

module.exports = AxeInjector;
