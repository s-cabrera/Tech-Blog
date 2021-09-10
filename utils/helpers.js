const moment = require('moment'); // require

module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return moment(date).format("MM/DD/YYYY");
  },
  isCommentFromLoggedInUser: (logged_user, post_user_id) => {
    return (post_user_id == logged_user)?true:false;
  }
};
