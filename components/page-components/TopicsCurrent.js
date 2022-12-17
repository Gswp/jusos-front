import React from 'react'
import Image from 'next/image'
import currentcss from '../../styles/page-modules/topics.current.module.scss'
import Carousel from "../other-components/Carousel"
import ReactMarkdown from 'react-markdown'
import rehypeRaw from "rehype-raw";

const TopicsCurrent = ({ data }) => {
  const instagramData = data.data.attributes.instagramFeed
  const dataAttributes = data.data.attributes
  const imagesWidth = "350"
  const imagesHeight = "350"

  return (
    <div className={currentcss.maincontainer}>

      <h1>{dataAttributes.title}</h1>

      {instagramData.data ? instagramData.data.map((item, id) => {

        if (item.media_type == "CAROUSEL_ALBUM") {
          const imageSource = [];

          item.children.data.map((item) => {
            imageSource.push(item.media_url)
          })

          // if(item.children.data.legnth == 1){
          //   imageSource.push(...imageSource)
          // }

          if(imageSource.length == 2){
            imageSource.push(...imageSource)
          }


          let carouselSettings = {
            length: imageSource.length,
            onClick: true,
            automatic: false,
            dataSource: imageSource,
            imageAlt: "instagram image",
            width: imagesWidth,
            height: imagesHeight,
            dots: false,
            boxWidth: `${imagesWidth}px`,
            translationTime: '0.3s',
          }
      


          return (
            <div key={id} className={currentcss.boxes}>
              <div className={currentcss.images}>
                {
                <div className={currentcss.imagecontainer}>
                  <Carousel settings={carouselSettings} />
             </div>}

              </div>
              <p className={item.caption ? currentcss.textboxes : "none"}>
                {item.caption}</p>

            </div>
          )
        }

        else if(item.media_type == "VIDEO"){

          return(
          <div key={id} className={currentcss.boxes}>
               <video className={currentcss.videos} src={item.media_url}
               height="450" controls>       
              </video>
  
                <ReactMarkdown className={item.caption ? currentcss.textboxes : "none"} rehypePlugins={[rehypeRaw]}>{item.caption}</ReactMarkdown>
            </div>
          )

        }

        else {
          return (
            <div key={id} className={currentcss.boxes}>
              <div className={currentcss.images}>
                {<Image
                  src={item.media_url}
                  alt="Spaziergang"
                 width={imagesWidth}
                 height={imagesHeight}
          priority />}
          </div>

              <p className={item.caption ? currentcss.textboxes : "none"}>
                {item.caption}</p>
            </div>
          )
        }



      }) :
        instagramData.error ?
          <><div> Instagram Error {instagramData.error.code} </div>
            <div> {instagramData.error.message} </div></> : ""}
    </div>
  )
}

export default TopicsCurrent