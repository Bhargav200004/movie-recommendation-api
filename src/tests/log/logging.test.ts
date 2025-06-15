import chalk from 'chalk';
import Logging from '@/log/logging';

jest.mock('chalk', () => ({
  blue: jest.fn((str) => str),
  blueBright: jest.fn((str) => str),
  yellow: jest.fn((str) => str),
  yellowBright: jest.fn((str) => str),
  red: jest.fn((str) => str),
  redBright: jest.fn((str) => str),
  green: jest.fn((str) => str),
  greenBright: jest.fn((str) => str)
}));

describe('Logging', () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();

    jest.clearAllMocks();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  describe('info', () => {
    it('should log string messages with correct formatting', () => {
      const message = 'Test info message';
      Logging.info(message);

      expect(chalk.blue).toHaveBeenCalledWith(expect.stringContaining('[INFO]:'));
      expect(chalk.blueBright).toHaveBeenCalledWith(message);
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log non-string arguments directly', () => {
      const obj = { test: 'data' };
      Logging.info(obj);

      expect(chalk.blue).toHaveBeenCalledWith(expect.stringContaining('[INFO]:'));
      expect(chalk.blueBright).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.any(String),
        obj
      );
    });
  });

  describe('warn', () => {
    it('should log string messages with correct formatting', () => {
      const message = 'Test warning message';
      Logging.warn(message);

      expect(chalk.yellow).toHaveBeenCalledWith(expect.stringContaining('[WARN]:'));
      expect(chalk.yellowBright).toHaveBeenCalledWith(message);
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log non-string arguments directly', () => {
      const obj = { test: 'data' };
      Logging.warn(obj);

      expect(chalk.yellow).toHaveBeenCalledWith(expect.stringContaining('[WARN]:'));
      expect(chalk.yellowBright).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.any(String),
        obj
      );
    });
  });

  describe('error', () => {
    it('should log string messages with correct formatting', () => {
      const message = 'Test error message';
      Logging.error(message);

      expect(chalk.red).toHaveBeenCalledWith(expect.stringContaining('[ERROR]:'));
      expect(chalk.redBright).toHaveBeenCalledWith(message);
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log non-string arguments directly', () => {
      const error = new Error('Test error');
      Logging.error(error);

      expect(chalk.red).toHaveBeenCalledWith(expect.stringContaining('[ERROR]:'));
      expect(chalk.redBright).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.any(String),
        error
      );
    });
  });

  describe('log', () => {
    it('should log string messages with correct formatting', () => {
      const message = 'Test log message';
      Logging.log(message);

      expect(chalk.green).toHaveBeenCalledWith(expect.stringContaining('[LOG]:'));
      expect(chalk.greenBright).toHaveBeenCalledWith(message);
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should log non-string arguments directly', () => {
      const obj = { test: 'data' };
      Logging.log(obj);

      expect(chalk.green).toHaveBeenCalledWith(expect.stringContaining('[LOG]:'));
      expect(chalk.greenBright).not.toHaveBeenCalled();
      expect(consoleLogSpy).toHaveBeenCalledWith(
        expect.any(String),
        obj
      );
    });
  });
});