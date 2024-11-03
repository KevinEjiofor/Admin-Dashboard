import { defineStore } from 'pinia';

export const useUserStore = defineStore('userStore', {
    state: () => ({
        users: [


            {
                id: 1,
                firstName: 'Justin',
                lastName: 'Septimus',
                email: 'example@email.com',
                userStatus: 'Active',
                paymentStatus: 'Paid',
                amount: '$200',
                lastLogin: '14/APR/2020',
                paymentDate: '15/APR/2020',
                paymentDueDate: null
            },
            {
                id: 2,
                firstName: 'Anika',
                lastName: 'Rhiel Madsen',
                email: 'example@email.com',
                userStatus: 'Active',
                paymentStatus: 'Overdue',
                amount: '$300',
                lastLogin: '14/APR/2020',
                paymentDate: null,
                paymentDueDate: '15/APR/2020'
            },
            {
                id: 3,
                firstName: 'Miracle',
                lastName: 'Vaccaro',
                email: 'example@email.com',
                userStatus: 'Active',
                paymentStatus: 'Paid',
                amount: '$250',
                lastLogin: '14/APR/2020',
                paymentDate: '15/APR/2020',
                paymentDueDate: null
            },
            {
                id: 4,
                firstName: 'Erin',
                lastName: 'Levin',
                email: 'example@email.com',
                userStatus: 'Active',
                paymentStatus: 'Unpaid',
                amount: '$200',
                lastLogin: '14/APR/2020',
                paymentDate: null,
                paymentDueDate: '15/APR/2020'
            },
            {
                id: 5,
                firstName: 'Mira',
                lastName: 'Herwitz',
                email: 'example@email.com',
                userStatus: 'Inactive',
                paymentStatus: 'Paid',
                amount: '$200',
                lastLogin: '14/APR/2020',
                paymentDate: '15/APR/2020',
                paymentDueDate: null
            },
            {
                id: 6,
                firstName: 'Jaxson',
                lastName: 'Siphron',
                email: 'example@email.com',
                userStatus: 'Inactive',
                paymentStatus: 'Paid',
                amount: '$750',
                lastLogin: '14/APR/2020',
                paymentDate: '15/APR/2020',
                paymentDueDate: null
            },
            {
                id: 7,
                firstName: 'Mira',
                lastName: 'Levin',
                email: 'example@email.com',
                userStatus: 'Active',
                paymentStatus: 'Unpaid',
                amount: '$200',
                lastLogin: '14/APR/2020',
                paymentDate: null,
                paymentDueDate: '15/APR/2020'
            },
            {
                id: 8,
                firstName: 'Lincoln',
                lastName: 'Levin',
                email: 'example@email.com',
                userStatus: 'Active',
                paymentStatus: 'Paid',
                amount: '$370',
                lastLogin: '14/APR/2020',
                paymentDate: '15/APR/2020',
                paymentDueDate: null
            },
            {
                id: 9,
                firstName: 'Phillip',
                lastName: 'Saris',
                email: 'example@email.com',
                userStatus: 'Inactive',
                paymentStatus: 'Unpaid',
                amount: '$200',
                lastLogin: '14/APR/2020',
                paymentDate: null,
                paymentDueDate: '15/APR/2020'
            },
            {
                id: 10,
                firstName: 'Cheyenne',
                lastName: 'Ekstrom Bothman',
                email: 'example@email.com',
                userStatus: 'Inactive',
                paymentStatus: 'Paid',
                amount: '$150',
                lastLogin: '14/APR/2020',
                paymentDate: '15/APR/2020',
                paymentDueDate: null
            }


],
        totalPayableAmount: 0,
    }),

    getters: {
        filteredUsers: (state) => (paymentStatus) => {
            return paymentStatus === 'All' ? state.users : state.users.filter(user => user.paymentStatus === paymentStatus);
        },

        calculateTotalPayable: (state) => {
            return state.users
                .filter(user => user.paymentStatus === 'Unpaid' || user.paymentStatus === 'Overdue')
                .reduce((total, user) => {
                    // Convert amount to a number by removing '$' and converting to integer
                    const amount = parseFloat(user.amount.replace('$', ''));
                    return total + amount;
                }, 0);
        }
    },

    actions: {
        markAsPaid(userId) {
            const user = this.users.find(user => user.id === userId);
            if (user && (user.paymentStatus === 'Unpaid' || user.paymentStatus === 'Overdue')) {
                user.paymentStatus = 'Paid';
                user.amount = '$0';
            }
        }
    }
});
