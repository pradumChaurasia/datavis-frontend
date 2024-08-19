import logo from './logo.svg';
import './App.css';
import NewCustomersOverTime from './components/NewCustomersOverTime';
import CustomerDistribution from './components/CustomerDistribution';
import TotalSalesOverTime from './components/TotalSalesOverTime';
import SalesGrowthRateOverTime from './components/SalesGrowthRateOverTime';
import DailyRepeatCustomers from './components/DailyRepeatCustomers';
import MonthlyRepeatCustomers from './components/MonthlyRepeatCustomers';
import YearlyRepeatCustomers from './components/YearlyRepeatCustomers';
import CLTVByCohorts from './components/CLTVByCohorts';
import { ThemeContext, ThemeProvider } from './components/ThemeContext';
import Sidebar from './components/Sidebar';
import { useContext } from 'react';

function AppContent() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <h1 className='heading'>Shopify Data Visualization</h1>
      <div className={`App ${theme}`}>
        <Sidebar />

        <div className="chart-container">
          <div className="chart"><NewCustomersOverTime /></div>
          <div className="chart"><CustomerDistribution /></div>
          <div className="chart"><TotalSalesOverTime /></div>
          <div className="chart"><SalesGrowthRateOverTime /></div>
          <div className="chart"><DailyRepeatCustomers /></div>
          <div className="chart"><MonthlyRepeatCustomers /></div>
          <div className="chart"><YearlyRepeatCustomers /></div>
          <div className="chart"><CLTVByCohorts /></div>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}


export default App;
