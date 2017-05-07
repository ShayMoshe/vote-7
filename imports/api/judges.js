import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Judges = new Mongo.Collection('judges');

if (Meteor.isServer) {

    Meteor.publish('judges', function judgesPublication() {
        return Judges.find({
           
        });
    });
}

Meteor.methods({
    'judges.insert'(obj) {

        // if (!Meteor.userId()) {
        //     throw new Meteor.Error('not-authorized');
        // }

        Judges.insert({
            judgeName: obj.judgeName,
            judgeId: obj.judgeId,
            createdAt: new Date(),
        });
    },

    'judges.remove'(judgeId) {
        check(judgeId, String);

        // const judges = Judges.findOne(judgeId);
        // if (judgesId.private && judges.owner !== Meteor.userId()) {
        //     throw new Meteor.Error('not-authorized');
        // }

        Judges.remove(judgeId);
    },

    'judges.setName'(judgeId, newName) {
        // check(judgeId, String);
        // check(newName, String);

        Judges.update(judgeId, { $set: { judgeName: newName } });
    },

    'judges.setId'(judgeId, newId) {
        Judges.update(judgeId, { $set: { judgeId: newId } });
    },
});
