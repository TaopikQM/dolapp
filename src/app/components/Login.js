import React from "react";
import { Logo } from "./Logo";

const LoginPembeli = () => {
  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1440px] h-[1024px]">
        <div className="relative w-[500px] h-[674px] top-[175px] left-[470px] bg-white rounded-[20px] overflow-hidden shadow-[0px_4px_4px_#00000040]">
          <div className="relative w-[508px] h-[674px]">
            <div className="absolute w-[508px] h-[674px] top-0 left-0">
              <div className="relative w-[500px] h-[674px] bg-white rounded-[20px] shadow-[0px_0px_10px_1px_#00000040]">
                <div className="absolute w-[422px] h-[73px] top-[208px] left-[42px]">
                  <div className="relative w-[420px] h-[73px] bg-white rounded-[20px] border border-solid border-[#c5c5c5]">
                    <div className="absolute w-[55px] h-[36px] top-[17px] left-[30px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#b8b8b8] text-[20px] text-center tracking-[0] leading-[normal]">
                      Email
                    </div>
                  </div>
                </div>
                <div className="absolute w-[422px] h-[78px] top-[301px] left-[39px]">
                  <div className="relative w-[420px] h-[78px] bg-white rounded-[20px] border border-solid border-[#c5c5c5]">
                    <div className="absolute w-[97px] h-[39px] top-[18px] left-[28px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#b8b8b8] text-[20px] tracking-[0] leading-[normal]">
                      Password
                    </div>
                  </div>
                </div>
                <div className="absolute w-[422px] h-[66px] top-[407px] left-[31px]">
                  <div className="relative w-[420px] h-[66px] bg-[#0059d2] rounded-[20px]">
                    <div className="absolute w-[66px] h-[33px] top-[17px] left-[176px] [font-family:'Poppins-Medium',Helvetica] font-medium text-white text-[20px] text-center tracking-[0] leading-[normal]">
                      Masuk
                    </div>
                  </div>
                </div>
                <div className="absolute w-[422px] h-[96px] top-[486px] left-[31px]">
                  <div className="absolute w-[422px] h-[66px] top-[30px] left-0">
                    <div className="relative w-[420px] h-[66px] bg-[#e8eaec] rounded-[20px]">
                      <div className="absolute w-[252px] h-[33px] top-[17px] left-[102px] mix-blend-color-burn [font-family:'Poppins-Medium',Helvetica] font-medium text-[#655b5b] text-[20px] text-center tracking-[0] leading-[normal]">
                        Masuk Dengan Google
                      </div>
                    </div>
                  </div>
                  <div className="absolute w-[234px] h-[46px] top-0 left-[71px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#2e3e56] text-[17px] text-right tracking-[0] leading-[normal]">
                    atau masuk dengan
                  </div>
                </div>
                <div className="absolute w-[60px] h-[46px] top-[604px] left-[43px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#5896f4] text-[20px] tracking-[0] leading-[normal]">
                  Lupa?
                </div>
                <div className="absolute w-[103px] h-[46px] top-[604px] left-[356px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#5896f4] text-[20px] text-right tracking-[0] leading-[normal]">
                  Buat Akun
                </div>
                <p className="absolute w-[385px] h-[41px] top-[147px] left-[58px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#424242] text-[18px] text-center tracking-[0] leading-[normal]">
                  Masuk dengan Akun yang sudah terdaftar
                </p>
                <Logo
                  FIX="image.png"
                  FIXClassName="!h-[109px] !w-[89px]"
                  className="!h-[109px] !absolute !left-[102px] !w-[279px] !top-[26px]"
                  divClassName="!left-[89px] !w-[190px] !top-[28px]"
                />
              </div>
            </div>
            <img
              className="absolute w-[30px] h-[38px] top-[530px] left-[86px] object-cover"
              alt="Image"
              src="image-1.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPembeli;
