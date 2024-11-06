import { defineStore } from 'pinia';
import {debounce} from "lodash";

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [
            { id: 1, firstName: 'Justin', lastName: 'Septimus', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Paid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 2, firstName: 'Anika', lastName: 'Rhiel Madsen', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Overdue', amount: '$300', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '15/APR/2020' },
            { id: 3, firstName: 'Miracle', lastName: 'Vaccaro', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Paid', amount: '$250', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 4, firstName: 'Erin', lastName: 'Levin', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Unpaid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '15/APR/2020' },
            { id: 5, firstName: 'Mira', lastName: 'Herwitz', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 6, firstName: 'Jaxson', lastName: 'Siphron', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$750', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 7, firstName: 'Mira', lastName: 'Levin', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Unpaid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '15/APR/2020' },
            { id: 8, firstName: 'Lincoln', lastName: 'Levin', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Paid', amount: '$370', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 9, firstName: 'Phillip', lastName: 'Saris', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Unpaid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '15/APR/2020' },
            { id: 10, firstName: 'Cheyenne', lastName: 'Ekstrom Bothman', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$150', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 11, firstName: 'Oscar', lastName: 'Stewart', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Overdue', amount: '$310', lastLogin: '12/APR/2020', paymentDate: null, paymentDueDate: '17/APR/2020' },
            { id: 12, firstName: 'Clara', lastName: 'Montoya', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$460', lastLogin: '11/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 13, firstName: 'Drew', lastName: 'Hanson', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Paid', amount: '$390', lastLogin: '10/APR/2020', paymentDate: '13/APR/2020', paymentDueDate: null },

            { id: 14, firstName: 'Skylar', lastName: 'Watts', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Unpaid', amount: '$210', lastLogin: '15/APR/2020', paymentDate: null, paymentDueDate: '20/APR/2020' },
            { id: 15, firstName: 'Adrian', lastName: 'Moss', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Overdue', amount: '$550', lastLogin: '13/APR/2020', paymentDate: null, paymentDueDate: '16/APR/2020' },

            { id: 16, firstName: 'Rowan', lastName: 'Cook', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$250', lastLogin: '12/APR/2020', paymentDate: '16/APR/2020', paymentDueDate: null },
            { id: 17, firstName: 'Mira', lastName: 'Levin', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Unpaid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '15/APR/2020' },
            { id: 18, firstName: 'Lincoln', lastName: 'Levin', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Paid', amount: '$370', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 19, firstName: 'Phillip', lastName: 'Saris', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Unpaid', amount: '$200', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '15/APR/2020' },
            { id: 20, firstName: 'Cheyenne', lastName: 'Ekstrom Bothman', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$150', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 21, firstName: 'Oscar', lastName: 'Stewart', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Overdue', amount: '$310', lastLogin: '12/APR/2020', paymentDate: null, paymentDueDate: '17/APR/2020' },
            { id: 22, firstName: 'Jaxson', lastName: 'Siphron', email: 'example@email.com', userStatus: 'Inactive', paymentStatus: 'Paid', amount: '$750', lastLogin: '14/APR/2020', paymentDate: '15/APR/2020', paymentDueDate: null },
            { id: 40, firstName: 'Jamie', lastName: 'Bennett', email: 'example@email.com', userStatus: 'Active', paymentStatus: 'Unpaid', amount: '$325', lastLogin: '14/APR/2020', paymentDate: null, paymentDueDate: '19/APR/2020' },
        ],
        currentStatus: 'All',
        searchQuery: '',
        sortKey: 'firstName',
        sortOrder: 'asc'
    }),

    getters: {
        filteredAndSearchedUsers(state) {
            let users = state.currentStatus === 'All'
                ? state.users
                : state.users.filter(user => user.paymentStatus === state.currentStatus);

            if (state.searchQuery) {
                users = users.filter(user =>
                    `${user.firstName} ${user.lastName}`.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(state.searchQuery.toLowerCase())
                );
            }
        //     let users = state.currentStatus === 'All'
        //         ? state.users
        //         : state.users.filter(user => user.paymentStatus === state.currentStatus);
        //
        //     if (state.searchQuery) {
        //         users = users.filter(user =>
        //             `${user.firstName} ${user.lastName}`.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        //             user.email.toLowerCase().includes(state.searchQuery.toLowerCase())
        //         );
        //     }
        //     return users;

        users.sort((a, b) => {
            const valueA = a[state.sortKey];
            const valueB = b[state.sortKey];

            if (state.sortOrder === 'asc') {
                return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
            } else {
                return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
            }
        });

        return users;
    },
        calculateTotalPayable: (state) => {
            return state.users
                .filter(user => user.paymentStatus === 'Unpaid' || user.paymentStatus === 'Overdue')
                .reduce((total, user) => total + parseFloat(user.amount.replace('$', '')), 0);
        }
    },

    actions: {
        filterByStatus(status) {
            this.currentStatus = status;
        },

        markAsPaid(userId) {
            const user = this.users.find(user => user.id === userId);
            if (user && (user.paymentStatus === 'Unpaid' || user.paymentStatus === 'Overdue')) {
                user.paymentStatus = 'Paid';
                user.amount = '$0';
            }
        },

        searchUsers: debounce(function (query) {
            this.searchQuery = query;
        }, 300),

        sortUsersBy(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc'; // Default to ascending order when a new field is selected
            }
        },
    },
});
