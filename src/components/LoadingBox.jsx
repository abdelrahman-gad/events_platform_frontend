
export default function LoadingBox({content}) {
    return (
      <div className="loading">
        <i className="fa fa-spinner fa-spin"></i> Lodding {' '} {content} ...
       </div>
    );
  }