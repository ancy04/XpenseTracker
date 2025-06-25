// styles
import "./AppHead.css";

// components
import Card from "../Card/Card";
import PieChartComp from "../PieChart/PieChart";

// prop-types for prop validation
import PropTypes from "prop-types";

const AppHead = ({ balance, expenses }) => {
  return (
    <header className="AppHead">
      <Card text="Wallet Balance" value={balance} />
      <Card text="Expenses" value={expenses} />
      <PieChartComp />
    </header>
  );
};

// ✅ PropTypes validation
AppHead.propTypes = {
  balance: PropTypes.number.isRequired,
  expenses: PropTypes.number.isRequired, // 👈 You were passing it directly to Card, not expenses.length
};

export default AppHead;
