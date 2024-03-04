import Image from "next/image";

function Feature() {
  return (
    <div className="relative flex justify-center items-center px-16 bg-white max-md:px-5 min-[1440px]:h-[1111px]">
      <Image
        src="/images/feature-asset.png"
        className="absolute invisible min-[1440px]:visible z-10"
        width={1233}
        height={1111}
      />
      <div className="flex flex-col w-full max-w-[1170px] max-md:max-w-full">
        <div className="mt-9 max-md:max-w-full">
          <div className="flex gap-20 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[43%] max-md:ml-0 max-md:w-full">
              <Image
                loading="lazy"
                src="/images/feature1.png"
                className="grow w-full aspect-[1.37] max-md:mt-10 max-md:max-w-full min-[1440px]:w-[454px] min-[1440px]:h-[330px]"
                width={454}
                height={330}
                alt="feature1"
              />
            </div>
            <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="text-4xl font-medium tracking-tighter leading-10 text-black max-md:max-w-full">
                  Learning experience has been enhanced with new technologies{" "}
                </div>
                <div className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:max-w-full">
                  <Image
                    loading="lazy"
                    src="/images/iconShield.svg"
                    width={36}
                    height={36}
                    alt="icon-shield"
                    className="self-start w-9 aspect-square"
                  />

                  <div className="flex flex-col flex-1 max-md:max-w-full">
                    <div className="text-2xl font-medium tracking-tight text-black max-md:max-w-full">
                      Secure & Easy
                    </div>
                    <div className="mt-2.5 text-base leading-6 text-slate-500 max-md:max-w-full">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur.{" "}
                      <span className="text-slate-500">Excepteur sint.</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-6 max-md:flex-wrap max-md:max-w-full">
                  <Image
                    loading="lazy"
                    src="/images/iconHeart.png"
                    width={36}
                    height={36}
                    alt="icon-heart"
                    className="self-start w-9 aspect-square"
                  />

                  <div className="flex flex-col flex-1 max-md:max-w-full">
                    <div className="text-2xl font-medium tracking-tight text-black max-md:max-w-full">
                      Supports All Students
                    </div>
                    <div className="mt-2.5 text-base leading-6 text-slate-500 max-md:max-w-full">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur.{" "}
                      <span className="text-slate-500">Excepteur sint.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-32 max-md:pr-5 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
            <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
                <div className="text-4xl font-medium tracking-tighter leading-10 text-black max-md:max-w-full">
                  Interactions between the tutor and the learners{" "}
                </div>
                <div className="flex gap-5 justify-between mt-10 max-md:flex-wrap max-md:max-w-full">
                  <Image
                    loading="lazy"
                    src="/images/iconCollab.svg"
                    width={36}
                    height={36}
                    alt="icon-collab"
                    className="self-start w-9 aspect-square"
                  />

                  <div className="flex flex-col flex-1 max-md:max-w-full">
                    <div className="text-2xl font-medium tracking-tight text-black max-md:max-w-full">
                      Purely Collaborative
                    </div>
                    <div className="mt-2.5 text-base leading-6 text-slate-500 max-md:max-w-full">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur.{" "}
                      <span className="text-slate-500">Excepteur sint.</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-6 max-md:flex-wrap max-md:max-w-full">
                  <Image
                    loading="lazy"
                    src="/images/iconHeart.png"
                    width={36}
                    height={36}
                    alt="icon-heart"
                    className="self-start w-9 aspect-square"
                  />

                  <div className="flex flex-col flex-1 max-md:max-w-full">
                    <div className="text-2xl font-medium tracking-tight text-black max-md:max-w-full">
                      Supports All Students
                    </div>
                    <div className="mt-2.5 text-base leading-6 text-slate-500 max-md:max-w-full">
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      es se cillum dolore eu fugiat nulla pariatur.{" "}
                      <span className="text-slate-500">Excepteur sint.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col ml-20 w-[43%] max-md:ml-0 max-md:w-full">
              <Image
                loading="lazy"
                src="/images/feature2.png"
                className="grow w-full aspect-[1.37] max-md:mt-10 max-md:max-w-full max-w-[454px]"
                width={454}
                height={330}
                alt="feature2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feature;
