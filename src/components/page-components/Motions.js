import { global } from "@/jusos.config";

import Link from "next/link";
import Introduction from "@components/other-components/Introduction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import motioncss from "@styles/page-modules/motion.module.scss";

const Motions = async ({ data }) => {
  const dataAttributes = data.data.attributes;

  // fetch motion data
  const motionData = await fetch(
    `${global.fetchURI}/motion-types?populate[motion][populate][0]=document`
  );
  const motionJson = await motionData.json();

  const sortedMotions = motionJson.data.sort(
    (a, b) =>
      new moment(b.attributes.date).format("YYYYMMDD") -
      new moment(a.attributes.date).format("YYYYMMDD")
  );

  return (
    <div className="container">
      <h1 className="header">{dataAttributes.title}</h1>
      <Introduction data={dataAttributes.introduction} />
      {sortedMotions.map((item, index) => {
        return (
          <section key={index} className={motioncss.typescontainer}>
            <h2>{item.attributes.title}</h2>
            <ul>
              {item.attributes.motion.map((motion, index) => {
                return (
                  <li className={motioncss.documentsbox} key={index}>
                    <h3>
                      <Link
                        href={`${global.host}${motion.document.data.attributes.url}`}
                        target="_blank"
                      >
                        {`${motion.title}`} <FontAwesomeIcon icon={faFile} />
                      </Link>
                    </h3>
                    {motion.status != null ? motion.status : <></>}
                  </li>
                );
              })}
            </ul>

            <div className="horizontalLine"></div>
          </section>
        );
      })}
    </div>
  );
};

export default Motions;
