import { useState, useEffect, useRef } from "react";
import Image from "next/image";

function Review() {
  const colors = ["#0088FE", "#00C49F", "#FFBB28"];
  const delay = 5000;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="review relative h-[742px] bg-[#FFF] flex items-center justify-center">
      <div className="box-border h-[476.33px] w-[1120px]">
        <div className="topic flex items-center justify-center text-[36px] font-medium leading-[125%] tracking-[-0.72px]">
          Our Graduates
        </div>
        <div
          className="slideshow"
          style={{
            flexWrap: "nowrap",
            margin: "0 auto",
            overflow: "hidden",
            maxWidth: "737.76px",
            maxHeight: "371px",
            borderRadius: "8px",
            paddingTop: "60px",
            display: "flex",
          }}>
          <div
            className="slideshowSlider"
            style={{
              transform: `translate3d(${-index * 100}%, 0, 0)`,
              whiteSpace: "nowrap",
              transition: "ease 1000ms",
            }}>
            <div
              className="slide1"
              key={0}
              style={{
                position: "relative",
                display: "inline-block",
                justifyContent: "center",
                alignItems: "center",
                height: "311px",
                width: "100%",
                gap: "50px",
              }}>
              <Image
                className="graduated1"
                src="/images/graduated1.png"
                width={200}
                height={240}
                alt="graduated1"
                style={{
                  display: "flex",
                  position: "absolute",
                  left: "0px",
                  top: "35.5px",
                }}
              />
              <div
                className="box-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "578.78px",
                  height: "309.48px",
                  paddingLeft: "70px",
                  marginLeft: "158.98px",
                  backgroundColor: "#E5ECF8",
                  borderRadius: "8px",
                }}>
                <div
                  className="sub-box-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#E5ECF8",
                  }}>
                  <div
                    className="graduated-name"
                    style={{
                      color: "#2F5FAC",
                      fontSize: "24px",
                      fontWeight: "500",
                    }}>
                    Saiful Islam
                  </div>
                  <div
                    className="graduated-comment"
                    style={{
                      width: "481.14px",
                      paddingTop: "24px",
                      color: "#646D89",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}>
                    Start with something simple and small, then expand over
                    time. <br />
                    If people call it a ‘toy’ you’re definitely onto something.{" "}
                    <br />
                    If you’re waiting for encouragement from others, you’re
                    doing it <br />
                    wrong. By the time people think an idea is good, it’s
                    probably <br />
                    too late.
                  </div>
                </div>
              </div>
            </div>

            <div
              className="slide2"
              key={1}
              style={{
                position: "relative",
                display: "inline-block",
                justifyContent: "center",
                alignItems: "center",
                height: "311px",
                width: "100%",
                gap: "50px",
              }}>
              <Image
                className="graduated2"
                src="/images/graduated2.png"
                width={200}
                height={240}
                alt="graduated1"
                style={{
                  display: "flex",
                  position: "absolute",
                  left: "0px",
                  top: "35.5px",
                }}
              />
              <div
                className="box-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "578.78px",
                  height: "309.48px",
                  paddingLeft: "70px",
                  marginLeft: "158.98px",
                  backgroundColor: "#E5ECF8",
                  borderRadius: "8px",
                }}>
                <div
                  className="sub-box-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#E5ECF8",
                  }}>
                  <div
                    className="graduated-name"
                    style={{
                      color: "#2F5FAC",
                      fontSize: "24px",
                      fontWeight: "500",
                    }}>
                    Saiful Islam
                  </div>
                  <div
                    className="graduated-comment"
                    style={{
                      width: "481.14px",
                      paddingTop: "24px",
                      color: "#646D89",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}>
                    Start with something simple and small, then expand over
                    time. <br />
                    If people call it a ‘toy’ you’re definitely onto something.{" "}
                    <br />
                    If you’re waiting for encouragement from others, you’re
                    doing it <br />
                    wrong. By the time people think an idea is good, it’s
                    probably <br />
                    too late.
                  </div>
                </div>
              </div>
              <Image
                className="absolute left-[0px] top-[0px] h-[57px] w-[82px]"
                src="/images/Quotemarks-left.png"
                alt="Quotemarks-left"
                width={82}
                height={57}
                style={{ objectFit: "cover" }}
                priority={true}
              />
              <Image
                className="absolute right-[1500px] bottom-[18px] h-[37px] w-[53px]"
                src="/images/Quotemarks-right.png"
                alt="Quotemarks-right"
                width={53}
                height={37}
                style={{ objectFit: "cover" }}
                priority={true}
              />
            </div>

            <div
              className="slide3"
              key={2}
              style={{
                position: "relative",
                display: "inline-block",
                justifyContent: "center",
                alignItems: "center",
                height: "311px",
                width: "100%",
                gap: "50px",
              }}>
              <Image
                className="graduated3"
                src="/images/graduated3.png"
                width={200}
                height={240}
                alt="graduated3"
                style={{
                  display: "flex",
                  position: "absolute",
                  left: "0px",
                  top: "35.5px",
                }}
              />
              <div
                className="box-text"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "578.78px",
                  height: "309.48px",
                  paddingLeft: "70px",
                  marginLeft: "158.98px",
                  backgroundColor: "#E5ECF8",
                  borderRadius: "8px",
                }}>
                <div
                  className="sub-box-text"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    backgroundColor: "#E5ECF8",
                  }}>
                  <div
                    className="graduated-name"
                    style={{
                      color: "#2F5FAC",
                      fontSize: "24px",
                      fontWeight: "500",
                    }}>
                    Saiful Islam
                  </div>
                  <div
                    className="graduated-comment"
                    style={{
                      width: "481.14px",
                      paddingTop: "24px",
                      color: "#646D89",
                      fontSize: "16px",
                      fontWeight: "500",
                    }}>
                    Start with something simple and small, then expand over
                    time. <br />
                    If people call it a ‘toy’ you’re definitely onto something.{" "}
                    <br />
                    If you’re waiting for encouragement from others, you’re
                    doing it <br />
                    wrong. By the time people think an idea is good, it’s
                    probably <br />
                    too late.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="slideshowSlider"
            style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}></div>

          <div
            className="slideshowDots"
            style={{
              position: "absolute",
              top: "50%",
              left: "47%",
              paddingTop: "220px",
              zIndex: "50",
            }}>
            {colors.map((_, idx) => (
              <div
                style={
                  index === idx
                    ? {
                        display: "inline-block",
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        margin: "15px 7px 0px",
                        backgroundColor: "#2F5FAC",
                        //position: "absolute",
                        zIndex: "50",
                      }
                    : {
                        display: "inline-block",
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        margin: "15px 7px 0px",
                        backgroundColor: "#c4c4c4",
                        //position: "absolute",
                        zIndex: "50",
                      }
                }
                key={idx}
                //className={`slideshowDot${index === idx ? " active" : ""}`}
                onClick={() => {
                  setIndex(idx);
                }}></div>
            ))}
          </div>
        </div>
      </div>
      <Image
        className="absolute left-[91px] top-[0px] h-[630px] w-[1356px]"
        src="/images/review-asset.png"
        alt="review-asset"
        width={1356}
        height={630}
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
}

export default Review;
