import Layout_Middle from "./Layout_Middle ";
import LeftSider from "./LeftSider";
import RightSider from "./RightSider";

const Container = () => {
    return (
        <div className="_container_fluid_custom">
        <div className="_layout_inner_wrap p-0 _layout_inner_wrap1">
          {/* For Different Pages */}
          <div className="_layout_top_full d-none">
            <div className="row">
              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12" />
            </div>
          </div>
          <div className="row">
            {/* Left Sidebar */}
            <LeftSider></LeftSider>
            {/* Left Sidebar */}
            {/* Layout Middle */}
           <Layout_Middle></Layout_Middle>
            {/* Layout Middle */}
            {/* Right Sidebar */}
            <RightSider></RightSider>
            {/* Right Sidebar */}
          </div>
          {/* Main Layout Structure */}
        </div>
      </div>
      
    );
};

export default Container;