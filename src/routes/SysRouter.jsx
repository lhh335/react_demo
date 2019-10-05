import BaseInfo from "../pages/System/BaseInfo";
import PwdInfo from "../pages/System/Password";
import SettingToken from "../pages/System/SettingToken";
import Authority from "../pages/System/Authority";
import OperateLog from "../pages/System/OperateLog";
import Data from "../pages/System/Data";

export const SysRouter = (key) => {
    switch (key) {
        case 'menu2_0_0':
            return <BaseInfo />;
        case 'menu2_0_1_0':
            return <PwdInfo />;
        case 'menu2_0_1_1':
            return <SettingToken />;
        case 'menu2_1':
            return <Authority />;
        case 'menu2_2':
            return <OperateLog />;
        case 'menu2_3':
            return <Data />;
        default:
            return null;
    }
}