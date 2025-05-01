// Created by Philip Brunet

const numDaysPerWeek = 7;
const numTimeslotsPerDay = 24;

const requireCalendar = (req, res, next) => {
  const { calendar } = req.body;
  if (!calendar) {
    return res.status(400).send({
      message: "Bad request",
      error: "Submission must include calendar",
    });
  }
  if (calendar.length !== numDaysPerWeek) {
    return res.status(400).send({
      message: "Bad request",
      error: `Calendar must be a ${numDaysPerWeek} by ${numTimeslotsPerDay} grid`,
    });
  }
  for (let i = 0; i < numDaysPerWeek; i++) {
    if (calendar[i].length !== numTimeslotsPerDay) {
      return res.status(400).send({
        message: "Bad request",
        error: `Calendar must be a ${numDaysPerWeek} by ${numTimeslotsPerDay} grid`,
      });
    }
  }
  next();
};

export { requireCalendar };
