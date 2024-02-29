import Image from "next/image";

function Feature() {
  return (
    <div className="feature relative bg-[#FFF] flex items-center justify-center min-[375px]:py-[50px] min-[1440px]:h-[1111px] min-[375px]:w-[375px]">
      <div className="box-border display:flex min-[1440px]:h-[780px] min-[1440px]:w-[1120px]">
        <div className="box-content1 display:flex min-[375px]:flex-col min-[375px]:items-center min-[375px]:justify-center min-[375px]:left-[150px] min-[1440px]:flex-row min-[1440px]:h-[330px]">
          <Image
            className="image rounded-[8px] min-[1440px]:w-[454px] min-[1440px]:h-[330px]"
            src="/images/feature1.png"
            width={454}
            height={330}
            alt="feature1"
            style={{ objectFit: "scale-down" }}
          />
          <div className="detail-feature flex-col min-[375px]:px-[10px] min-[375px]:pl-[50px] min-[375px]:w-[355px] min-[1440px]:w-[547px] min-[1440px]:h-[330px] min-[1440px]:text-[36px] min-[1440px]:font-medium min-[1440px]:pl-[119px]">
            <div className="topic-feature min-[1440px]:w-[547px] min-[1440px]:text-[36px] min-[1440px]:font-medium min-[1440px]:leading-[125%] min-[1440px]:tracking-[-0.72px]">
              Learning experience has been enhanced with new technologies
            </div>
            <div className="unordered-list w-[547px] h-[240px] pt-[40px] text-[36px] font-medium">
              <div className="unordered-list1 flex flex-row h-[88px] text-[24px] font-medium">
                <Image
                  className="image-icon w-[36px] h-[36px]"
                  src="/images/iconShield.svg"
                  width={36}
                  height={36}
                  alt="icon-shield"
                />
                <div className="text pl-[24px]">
                  <div className="topic-list1 w-[100%] h-auto text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
                    Secure & Easy
                  </div>
                  <div className="items-list1 w-[100%] h-auto pt-[10px] text-[16px] text-[#646D89] font-medium leading-[150%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </div>
                </div>
              </div>
              <div className="unordered-list2 flex flex-row h-[88px] pt-[24px] text-[24px] font-medium">
                <Image
                  className="image-icon w-[36px] h-[36px]"
                  src="/images/iconHeart.png"
                  width={36}
                  height={36}
                  alt="icon-shield"
                />
                <div className="text pl-[24px]">
                  <div className="topic-list2 w-[100%] h-auto text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
                    Supports All Students
                  </div>
                  <div className="items-list2 w-[100%] h-auto pt-[10px] text-[16px] text-[#646D89] font-medium leading-[150%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="box-content2 pt-[120px] h-[450px] display: flex">
          <div className="detail-feature flex flex-col h-[330px] text-[36px] font-medium">
            <div className="topic-feature w-[547px] text-[36px] font-medium leading-[125%] tracking-[-0.72px]">
              Interactions between the tutor and the learners
            </div>
            <div className="unordered-list w-[547px] h-[240px] pt-[40px] text-[36px] font-medium">
              <div className="unordered-list1 flex flex-row h-[88px] text-[24px] font-medium">
                <Image
                  className="image-icon w-[36px] h-[36px]"
                  src="/images/iconShield.svg"
                  width={36}
                  height={36}
                  alt="icon-shield"
                />
                <div className="text pl-[24px]">
                  <div className="topic-list1 w-[100%] h-auto text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
                    Purely Collaborative
                  </div>
                  <div className="items-list1 w-[100%] h-auto pt-[10px] text-[16px] text-[#646D89] font-medium leading-[150%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </div>
                </div>
              </div>
              <div className="unordered-list2 flex flex-row h-[88px] pt-[24px] text-[24px] font-medium">
                <Image
                  className="image-icon w-[36px] h-[36px]"
                  src="/images/iconHeart.png"
                  width={36}
                  height={36}
                  alt="icon-shield"
                />
                <div className="text pl-[24px]">
                  <div className="topic-list2 w-[100%] h-auto text-[24px] font-medium leading-[125%] tracking-[-0.48px]">
                    Supports All Students
                  </div>
                  <div className="items-list2 w-[100%] h-auto pt-[10px] text-[16px] text-[#646D89] font-medium leading-[150%]">
                    Duis aute irure dolor in reprehenderit in voluptate velit es
                    se cillum dolore eu fugiat nulla pariatur. Excepteur sint.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Image
            className="image w-[454px] h-[330px] ml-[119px] rounded-[8px]"
            src="/images/feature2.png"
            width={454}
            height={330}
            alt="feature1"
          />
        </div>
      </div>
      <Image
        className="absolute left-[140px] top-[0px] h-[1111px] w-[1233px]"
        src="/images/feature-asset.png"
        alt="feature-asset"
        width={1233}
        height={1111}
        style={{ objectFit: "cover" }}
        priority={true}
      />
    </div>
  );
}

export default Feature;
