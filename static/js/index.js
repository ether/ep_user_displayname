'use strict';

// clientVars was added to the context in Etherpad 1.8.15.
exports.postAceInit = (hookName, {clientVars = window.clientVars}) => {
  const {ep_user_displayname: {changeable} = {}} = clientVars;
  if (changeable != null && !changeable) {
    $('#myusernameedit').attr('disabled', true).removeClass('editable');
  }
};
