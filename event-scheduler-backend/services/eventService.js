// Created by Philip Brunet

import Event from "../models/Event.js";
import QueryError from "../queryError.js";

class EventService {
  static async createEvent(eventObj, customErrMsg) {
    const event = await Event.create(eventObj);
    if (!event) {
      throw new QueryError(
        customErrMsg ? customErrMsg : "Could not create event",
        500
      );
    }
    return event;
  }

  static async getEventById(eventId) {
    const event = await Event.findById(eventId);
    return event;
  }

  static async getEventsPaginated(filter, sort, currPage, itemsPerPage) {
    const events = await Event.find(filter)
      .sort(sort)
      .skip(currPage * itemsPerPage)
      .limit(itemsPerPage);
    return events;
  }

  static async countEvents(filter) {
    const numEvents = await Event.countDocuments(filter);
    return numEvents;
  }

  static async updateEventById(eventId, updateObj, optionsObj) {
    const event = await Event.findByIdAndUpdate(eventId, updateObj, optionsObj);
    return event;
  }
}

export default EventService;
