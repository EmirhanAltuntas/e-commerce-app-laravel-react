import { Routes,Route } from "react-router-dom";
import { Container } from "reactstrap";
import Header from "./app/Components/Header";
import Login from "./app/Pages/Auth/Login";
import Register from "./app/Pages/Auth/Register";
import AdminDashboard from "./app/Pages/Admin/Dashboard/AdminDashboard";
import AdminProduct from "./app/Pages/Admin/Product/AdminProduct";
import AdminCooperationRequests from "./app/Pages/Admin/CooperaitonRequests/AdminCooperationRequests";
import AdminEmployeeRequests from "./app/Pages/Admin/EmployeeRequests/AdminEmployeeRequests";
import AdminAppStatistics from './app/Pages/Admin/Statistics/AdminAppStatistics';
import Home from './app/Pages/Home'
import NotFound from "./app/Pages/NotFound";
import AdminCategory from "./app/Pages/Admin/Category/adminCategory";
import Footer from "./app/Components/Footer";
import StoreRegister from "./app/Pages/StoreRegister";
import StoreHome from "./app/Pages/StoreManagement/StoreHome";
import MyProducts from "./app/Pages/StoreManagement/MyProducts";
import MyEmployees from "./app/Pages/StoreManagement/MyEmployees";
import { useAppSelector } from "./app/hooks";
import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import DocumentManagement from "./app/Pages/Admin/DocumentManagement/DocumentManagement";
import ProductDetail from "./app/Pages/ProductDetail/ProductDetail";

function App() {

  const user = useAppSelector((state)=>state.auth.user);
  // console.log(user&&user.user_level?user.user_level:"")
  return (
    <Container className="App p-0" fluid={true}>
       <Header></Header>
      <Routes>
        <Route path='login' element={<Login></Login>} /> 
        <Route path='*' element={<NotFound></NotFound>} /> 
        <Route path='/' element={<Home></Home>} />
        <Route path='/product-detail/:id' element={<ProductDetail></ProductDetail>} />
        <Route path='register' element={<Register></Register>} />
        <Route path="storeRegister" element={<StoreRegister></StoreRegister>}></Route>

        <Route path='/*' element={user&&user.user_level==1?<AdminDashboard></AdminDashboard>:<NotFound></NotFound>} >
          <Route path="adminProduct" element={<AdminProduct></AdminProduct>}></Route>
          <Route path="adminCategory" element={<AdminCategory></AdminCategory>}></Route>
          <Route path="cooperationRequests" element={<AdminCooperationRequests></AdminCooperationRequests>}></Route>
          <Route path="employeeRequests" element={<AdminEmployeeRequests></AdminEmployeeRequests>}></Route>
          <Route path="statistics" element={<AdminAppStatistics></AdminAppStatistics>}></Route>
          <Route path="documentManagement" element={<DocumentManagement></DocumentManagement>}></Route>
        </Route>
        <Route path='store-management' element={user&&user.user_level >1 &&user.user_level<4 ? <StoreHome></StoreHome>:<NotFound></NotFound> }>
            <Route path='my-products' element={user&&user.user_level >1 &&user.user_level<4  ? <MyProducts></MyProducts>:<NotFound></NotFound>}></Route>
            <Route path='my-employees' element={user&&user.user_level == 2?<MyEmployees></MyEmployees>:<NotFound></NotFound>}></Route>
        </Route>
      </Routes>
      <Footer></Footer>
    </Container>
  );
}

export default App;
