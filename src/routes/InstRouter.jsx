import Overview from "../pages/Inst/Overview";
import Creation from "../pages/Inst/Creation";
import Approval from "../pages/Inst/Approval";
import Exection from "../pages/Inst/Exection";


export const InstRouter = (key) => {
  switch (key) {
    case 'menu1_0':
      return <Overview />;
    case 'menu1_1':
      return <Creation />;
    case 'menu1_2':
      return <Approval />;
    case 'menu1_3':
      return <Exection />;
    default:
      return null;
  }
}