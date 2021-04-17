const Database = require('../database/db');
const createProffy = require('../database/createProffy');
const { convertHoursToMinutes } = require('../utils/format');

module.exports = {
  async saveClass(request, response) {
    const proffyValue = {
      name: request.body.name,
      avatar: request.body.avatar,
      whatsapp: request.body.whatsapp,
      bio: request.body.bio
    };

    const classValue = { 
      subject: request.body.subject,
      cost: request.body.cost
    };

    const classScheduleValues = request.body.weekday.map((weekday, index) => {
      return {
        weekday,
        time_from: convertHoursToMinutes(request.body.time_from[index]),
        time_to: convertHoursToMinutes(request.body.time_to[index]),
      }
    });

    try {
      const db = await Database;
      await createProffy(db, {
        proffyValue,
        classValue,
        classScheduleValues
      });

      let queryString = "?subject" + request.body.subject;
      queryString += "&weekday=" + request.body.weekday[0];
      queryString += "&time=" + request.body.time_from[0];

      return response.redirect('/study' + queryString);
    } catch (error) {
      console.log(error);
    }
  }
};