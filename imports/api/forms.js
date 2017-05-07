import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Forms = new Mongo.Collection('forms');

if (Meteor.isServer) {

    Meteor.publish('forms', function formsPublication() {
        return Forms.find({
           
        });
    });
}

Meteor.methods({
    'forms.insert'(obj) {

        Forms.insert({
            formName: obj.formName,
            createdAt: new Date(),
        });
    },

    'forms.remove'(formId) {
        check(formId, String);
        Forms.remove(formId);
    },

    'forms.setName'(formId, newName) {
        // check(judgeId, String);
        // check(newName, String);

        Forms.update(formId, { $set: { formName: newName } });
    },

});
