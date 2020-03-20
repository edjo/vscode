const template: string = `//select the database to use.
use('test');
//run a find command.
db.my_collection.find({foo: 'bar'});
//run an aggregation.
const agg = [
  {$match: {foo: 'bar'}}
];
db.my_collection.aggregate(agg);
`;

export default template;