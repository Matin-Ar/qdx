// import moment from "moment";

// //get visible expenses
// const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy }) => {
//   return expenses
//     .filter((expense) => {
//       const createdAtMoment = moment(expense.createdAt);

//       const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, "day") : true;
//       const endDateMatch = endDate ? endDate.isSameOrBefore(createdAtMoment, "day") : true;
//       const textMatch =  text === "" || expense.description.toLowerCase().includes(text.toLowerCase());

//       return startDateMatch && endDateMatch && textMatch;
//     })
//     .sort((a, b) => {
//       if (sortBy === "date") {
//         return a.createdAt > b.createdAt ? -1 : 1;
//       } else if (sortBy === "amount") {
//         return a.amount > b.amount ? -1 : 1;
//       }
//     });
// };

// export default getVisibleExpenses;
