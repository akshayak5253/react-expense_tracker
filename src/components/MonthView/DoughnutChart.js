import React from "react";
import { Doughnut } from "react-chartjs-2";
import Loader from "../Common/Loader";
import * as utils from "../Util";

const DoughnutChart = props => {
    let expenses = props.expenses;
    let currentUser = props.authUser;
    let selectedMonth = props.month;
    let selectedYear = props.year;

    let allCategoryTotals = null;

    if (!expenses || !currentUser || !selectedMonth || !selectedYear) {
        return (
            <div>
                <Loader />
            </div>
        );
    }

    if (expenses && currentUser && selectedMonth && selectedYear) {
        let eachExpense = utils.eachExpense(expenses);
        let usersExpensesInSelectedMonthAndYear = utils.expensesinMonthAndYear(
            eachExpense,
            currentUser,
            selectedMonth,
            selectedYear
        );

        allCategoryTotals = utils.calculateTotalForAllCategories(usersExpensesInSelectedMonthAndYear);

        let data = {
            labels: utils.categories,
            datasets: [
                {
                    data: Object.values(allCategoryTotals),
                    backgroundColor: utils.categoryColors,
                    hoverBackgroundColor: utils.categoryColors
                }
            ]
        };

        const options = {
            legend: { display: true, position: "left", fullWidth: true, reverse: false },
            layout: { padding: { left: 15, right: 85, top: 5, bottom: 5 } }
        };

        const optionsMobile = {
            legend: { display: true, position: "bottom", fullWidth: true },
            layout: { padding: { left: 15, right: 15, top: 15, bottom: 15 } }
        };

        return (
            <div>
                <hr />
                <h4>Category Analyser</h4>
                <Doughnut
                    data={data}
                    options={window.screen.width > 720 ? options : optionsMobile}
                    height={window.screen.width > 720 ? 80 : 450}
                    responsive={true}
                />
            </div>
        );
    }
};

export default DoughnutChart;
