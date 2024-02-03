import Image from "next/image";

function Feature() {
  return (
    <div className="feature relative h-[1111px] bg-[#FFF] flex items-center justify-center ">
      <div className="box-border h-[780px] w-[1120px] ">
        <div className="box-content1 h-[330px] display: flex flex-row">
          <Image
            className="image w-[454px] h-[330px] rounded-[8px]"
            src="/images/feature1.png"
            width={454}
            height={330}
            alt="feature1"
            style={{ objectFit: "cover" }}
          />
          <div className="detail-feature flex-col w-[547px] h-[330px] text-[36px] font-medium pl-[119px]">
            <div className="topic-feature w-[547px] text-[36px] font-medium leading-[125%] tracking-[-0.72px]">
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
