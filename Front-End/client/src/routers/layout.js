import Navbar from "../layouts/navbar/navbar";
function Layout({ children }) {

  return (
    <>
      <div>
        <Navbar/>
        {children}
      </div>
    </>
  );
}

export default Layout;