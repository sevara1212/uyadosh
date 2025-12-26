import { mockUsers } from "../data/Data";

console.log('📋 All Users List:');
console.log('==================');

mockUsers.forEach((user, index) => {
  console.log(`${index + 1}. ${user.name} (${user.gender}) - ID: ${user.id}`);
});

console.log(`\n📊 Summary:`);
console.log(`Total Users: ${mockUsers.length}`);
console.log(`Male Users: ${mockUsers.filter(u => u.gender === 'Male').length}`);
console.log(`Female Users: ${mockUsers.filter(u => u.gender === 'Female').length}`);
