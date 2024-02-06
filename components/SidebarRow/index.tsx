import Link from "next/link";
import React, { SVGProps } from "react";

interface propsType {
  Icon?: (props: SVGProps<SVGAElement>) => JSX.Element;
  title?: string;
  linkToNavigate?:string
}

const index = (props: propsType) => {
  const { title,linkToNavigate } = props;
  return (
    <Link 
    className="cursor-pointer  hover:text-blue-500 transition-colors duration-300 ease-linear uppercase "
    href={`${linkToNavigate}`}
 
    >
      <p>{title}</p>
    </Link>
  );
};

export default index;
