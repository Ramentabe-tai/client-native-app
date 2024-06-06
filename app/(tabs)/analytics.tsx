import React from "react";
import Transactions from '@/components/flatList/Transactions'
import LineChart from "@/components/charts/LineChart";

export default function Analytics() {

  return (<>
    <LineChart />
    <Transactions />
  </>)
}
