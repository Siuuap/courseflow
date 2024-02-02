import React from "react";

export default function TestDashBoardPage() {
  return (
    <div className="bg-white">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
        <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow pb-12 mx-auto w-full text-base font-medium leading-6 whitespace-nowrap bg-white border-r border-solid border-r-[color:var(--gray-400,#D6D9E4)] text-slate-600">
            <div className="flex flex-col justify-end px-8 pt-10 pb-6 text-center text-slate-500 max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/9280081f701776746fc1e904739cfbd8125792af821959f6e3893de51c4280d2?"
                className="self-center aspect-[9.09] fill-[linear-gradient(110deg,#95BEFF_18.21%,#0040E5_95.27%)] w-[174px]"
              />
              <div className="mt-6">Admin Panel Control</div>
            </div>
            <div className="flex gap-4 justify-between px-6 py-4 mt-10 bg-gray-100 max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/99c80b60e392aeabaac4a56021bd507be076c778b748e731632fecd5e444f7e4?"
                className="w-6 aspect-square"
              />
              <div className="grow">Course</div>
            </div>
            <div className="flex gap-4 justify-between px-6 py-4 bg-white max-md:px-5">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b06711da7d7172fa3ea725d25d42ef450f8455a125bf8be82daef1c9b6b5cf5f?"
                className="w-6 aspect-square"
              />
              <div className="grow">Assignment</div>
            </div>
            <div className="flex gap-4 justify-between px-6 py-4 font-bold bg-white mt-[468px] max-md:px-5 max-md:mt-10">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b424f751a11a6ba15de399b3d1488c9d0667df969ac5410cbcb486e773ae0d0f?"
                className="w-6 aspect-square"
              />
              <div className="grow">Log out</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow max-md:max-w-full">
            <div className="flex gap-4 justify-between px-10 py-4 whitespace-nowrap bg-white border-b border-solid border-b-[color:var(--gray-400,#D6D9E4)] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="grow my-auto text-2xl font-medium tracking-tight text-slate-800 max-md:max-w-full">
                Course
              </div>
              <div className="flex gap-4 justify-between text-base leading-6 max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-2.5 px-4 py-3 my-auto bg-white rounded-lg border border-solid border-[color:var(--Gray-300,#CCD0D7)] text-slate-400">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/f282acfc29742ba5658c2334fc972ef10aa089371cd80fedc96dfa6cb660a5f4?"
                    className="w-6 aspect-square"
                  />
                  <div className="grow">Search...</div>
                </div>
                <div className="grow justify-center px-8 py-5 font-bold text-center text-white bg-blue-800 rounded-xl shadow-lg max-md:px-5">
                  + Add Course
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center px-10 py-12 text-base leading-6 text-justify text-black bg-slate-50 max-md:px-5 max-md:max-w-full">
              <div className="flex gap-5 justify-between px-16 py-2.5 text-sm bg-gray-200 text-slate-600 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
                <div>Image</div>
                <div className="flex-auto">Course name</div>
                <div>Lesson</div>
                <div>Price</div>
                <div className="flex-auto">Created date</div>
                <div className="flex-auto">Updated date</div>
                <div>Action</div>
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center whitespace-nowrap">
                    <div className="self-stretch my-auto">8</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="grow self-stretch my-auto">
                      Service Design Essentials
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center">
                    <div className="self-stretch my-auto">7</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="flex-auto self-stretch my-auto">
                      Software Developer
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center">
                    <div className="self-stretch my-auto">6</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="flex-auto self-stretch my-auto">
                      UX/UI Design Beginer
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center whitespace-nowrap">
                    <div className="self-stretch my-auto">5</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="grow self-stretch my-auto">
                      Service Design Essentials
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center">
                    <div className="self-stretch my-auto">4</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="flex-auto self-stretch my-auto">
                      Software Developer
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center">
                    <div className="self-stretch my-auto">3</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="flex-auto self-stretch my-auto">
                      UX/UI Design Beginer
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center whitespace-nowrap">
                    <div className="self-stretch my-auto">2</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="grow self-stretch my-auto">
                      Service Design Essentials
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/9b45172638e35061204eb430ad193fb14d9b4f4e81139ac59031386a734ff393?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
              <div className="flex gap-3 justify-between mb-16 bg-white border-b border-solid border-b-[color:var(--gray-200,#F1F2F6)] max-md:flex-wrap max-md:mb-10 max-md:max-w-full">
                <div className="flex gap-5 justify-between py-5 pr-px pl-5 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-center">
                    <div className="self-stretch my-auto">1</div>
                    <img
                      loading="lazy"
                      srcSet="..."
                      className="self-stretch w-16 aspect-[1.37]"
                    />
                    <div className="flex-auto self-stretch my-auto">
                      Software Developer
                    </div>
                  </div>
                  <div className="flex gap-5 justify-between my-auto max-md:flex-wrap max-md:max-w-full">
                    <div className="grow whitespace-nowrap">6 Lessons</div>
                    <div>3,559.00</div>
                    <div className="flex-auto">12/02/2022 10:30PM</div>
                    <div className="grow whitespace-nowrap">
                      12/02/2022 10:30PM
                    </div>
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3d6904313be5d30f9563df6a61cacf73b781d0bbcddb187c8b5ccdf1e9d07581?"
                  className="max-w-full aspect-[1.37] w-[120px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
