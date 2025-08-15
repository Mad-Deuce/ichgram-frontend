import { useSelector } from "react-redux";

import { selectIsLogin } from "../../redux/auth/auth-selectors";

const useLogin = ()=> {
    const isLogin = useSelector(selectIsLogin);

    return isLogin;
}

export default useLogin;