import * as Joi from 'joi';

export const ReadingSettingsValidator = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  link: Joi.string(),
});

export const setReadingSettingsConfigValidator = Joi.object({
    homePage: ReadingSettingsValidator,
    postsPage: ReadingSettingsValidator,
    shopPage: ReadingSettingsValidator,
});
