const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const data = [
  {
    _id: ObjectId('5b9e1794a626cddcb03a6df5'),
    title: 'project 1',
    description: 'This is the description for project 1',
    status: 'finished',
    data: 'https://',
    uid: '1',
    requires: [],
  },
  {
    _id: ObjectId('5ba0f22cb0ad9d0908ece391'),
    title: 'project 1b',
    description: 'This is the description for project 1b',
    status: 'finished',
    data: 'https://',
    uid: '2',
    requires: [],
  },
  {
    _id: ObjectId('5ba0f2a2b41162092b59d900'),
    title: 'project 2b',
    description: 'This is the description for project 2b',
    status: 'not started',
    data: 'https://',
    uid: '2',
    requires: ['5ba0f22cb0ad9d0908ece391'],
  },
  {
    _id: ObjectId('5ba0f2a2b41162092b59d901'),
    title: 'project 2',
    description: 'This is the description for project 2',
    status: 'not started',
    data: 'https://',
    uid: '1',
    requires: ['5b9e1794a626cddcb03a6df5'],
  },
  {
    _id: ObjectId('5ba0f2a2b41162092b59d902'),
    title: 'project 3',
    description: 'This is the description for project 3',
    status: 'in progress',
    data: 'https://',
    uid: '1',
    requires: ['5b9e1794a626cddcb03a6df5'],
  },
  {
    _id: ObjectId('5ba0f2a2b41162092b59d903'),
    title: 'project 4',
    description: 'This is the description for project 4',
    status: 'finished',
    data: 'https://',
    uid: '1',
    requires: ['5b9e1794a626cddcb03a6df5', '5ba0f2a2b41162092b59d902'],
  },
];

module.exports = data;
