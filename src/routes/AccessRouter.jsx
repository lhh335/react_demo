import Menu1 from "../pages/menus/Menu1";
import Menu2 from "../pages/menus/Menu2";
import Menu3 from "../pages/menus/Menu3";
import Menu4 from "../pages/menus/Menu4";


export const  AccessRouter = (key) => {
  switch(key) {
    case 'menu1_0':
      return <Menu1 />;
    case 'menu1_1':
      return <Menu2 />;
    case 'menu1_2':
      return <Menu3 />;
    case 'menu1_3':
      return <Menu4 />;
    default:
      return <Menu1 />;
  }
}