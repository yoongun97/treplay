import React from 'react';
import { Link, useParams } from 'react-router-dom';

function NationPage() {
  // category 파라미터를 가져옴
  const { nation } = useParams();

  return (
    <div>
      {/*category 파라미터를 삽입하여 링크 생성 */}
      <Link to={`/${nation}/관광명소`}>관광명소</Link> <br />
      <Link to={`/${nation}/맛집`}>맛집</Link> <br />
      <Link to={`/${nation}/숙박`}>숙박</Link> <br />
    </div>
  );
}

export default NationPage;
