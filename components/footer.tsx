import { Facebook, Instagram, Twitter, YoutubeIcon } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#29294D] text-black">
            <div className="container mx-auto md:py-12 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="">
                        <a href="/" className="ml-4 cursor-pointer block">
                            <img className="" alt="logo" src="/logo.png" />
                        </a>
                        <p className="mt-0 ml-6 text-sm text-white md:w-[350px]">Lorem ipsum dolor sit amet, consectetur adipisci elit. Donec ultricies mi in ipsum vehicula lacinia. Iner porttitor ac libero .</p>
                    </div>
                    <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end md:ml-[200px] text-white">
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
                            <ul className="list-none">
                                <Link href="/about">
                                    <li className="mb-2">Home</li>
                                </Link>
                                <Link href="/blogs/all">
                                    <li className="mb-2">About Us</li>
                                </Link>
                                <Link href="/login">
                                    <li className="mb-2">Our Services</li>
                                </Link>
                                <Link href="/dashboard">
                                    <li className="mb-2">Contact Us</li>
                                </Link>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 p-4">
                            <h3 className="text-xl font-semibold mb-2">Pages</h3>
                            <ul className="list-none">
                                <Link href="/about">
                                    <li className="mb-2">Our Blog</li>
                                </Link>
                                <Link href="/blogs/all">
                                    <li className="mb-2">Our Team</li>
                                </Link>
                                <Link href="/login">
                                    <li className="mb-2">Testimonials</li>
                                </Link>
                                <Link href="/dashboard">
                                    <li className="mb-2">CTA</li>
                                </Link>
                            </ul>
                        </div>

                        <div className="w-full md:w-1/2 lg:w-1/2 p-4">
                            <h3 className="text-xl font-semibold mb-2">Contact</h3>
                            <ul className="list-none">
                                <li className="mb-2">call us for any enquiry at (+91) 96445 53399</li>
                                <li className="mb-2">drop your enquiry at samglobaluni@gmail.com</li>
                                <li className="mb-2">Kolua, Gram Adampur Chawni, Raisen Road, Bhopal (M.P.) 462021</li>
                                <ul className="list-none flex space-x-4 mt-4">
                                    <li>
                                        <a href="#">
                                            <Facebook className="w-6 h-6 text-blue-500 hover:text-blue-700 transition duration-300" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700 transition duration-300" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <Twitter className="w-6 h-6 text-blue-400 hover:text-blue-600 transition duration-300" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <YoutubeIcon className="w-7 h-7 text-red-400 hover:red-blue-600 transition duration-300" />
                                        </a>
                                    </li>
                                </ul>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#1d1d3b] py-4 md:text-lg text-md text-white">
                <div className="container mx-auto text-center">
                    <p>
                        © SAM Global University 2020. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
