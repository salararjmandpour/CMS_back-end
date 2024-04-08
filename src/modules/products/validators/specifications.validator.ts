import * as Joi from 'joi';

export const SpecificationsValidator = Joi.object({
  key: Joi.object().required(),
  value: Joi.object().required(),
});

// key, (id, title)
// value (id, title)

// [
//   { key: { id: 1, titel: "رنگ" }, value: { id: 64, title: "زرد" } },
//   { key: { id: 1, titel: "رنگ" }, value: { id: 84, title: "آبی" } },
// ];
