function Homepage() {
    return ( 
        <div className="formHomepage">
            <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                <img src="https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"/>
                <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl" aria-hidden="true">
                    <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
                </div>
                <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu" aria-hidden="true">
                    <div class="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"></div>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0">
                        <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Max Allan-Smith</h2>
                        <p class="mt-6 text-lg leading-8 text-gray-300">A junior Software Developer who has studied intensively at Makers Academy, London. My skills range from building advanced web applications and SQL databases to functional desktop applications.</p>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10">
                            <a href="/">Places of Study <span aria-hidden="true">&rarr;</span></a>
                            <a href="/">Inspirations <span aria-hidden="true">&rarr;</span></a>
                            <a href="/">My Values <span aria-hidden="true">&rarr;</span></a>
                            <a href="/">Leadership Skills <span aria-hidden="true">&rarr;</span></a>
                        </div>
                        <dl class="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            <div class="flex flex-col-reverse">
                            <dt class="text-base leading-7 text-gray-300">Now an Alumni Member</dt>
                            <dd class="text-2xl font-bold leading-9 tracking-tight text-white">Makers Academy</dd>
                            </div>

                            <div class="flex flex-col-reverse">
                            <dt class="text-base leading-7 text-gray-300">Current Projects</dt>
                            <dd class="text-2xl font-bold leading-9 tracking-tight text-white">25</dd>
                            </div>

                            <div class="flex flex-col-reverse">
                            <dt class="text-base leading-7 text-gray-300">Hours per week</dt>
                            <dd class="text-2xl font-bold leading-9 tracking-tight text-white">40</dd>
                            </div>

                            <div class="flex flex-col-reverse">
                            <dt class="text-base leading-7 text-gray-300">Paid time off</dt>
                            <dd class="text-2xl font-bold leading-9 tracking-tight text-white">Unlimited</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;