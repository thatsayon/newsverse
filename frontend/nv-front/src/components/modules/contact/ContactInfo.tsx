export default function CContact() {
  return (
    <>
      <div>
        <div className="mb-4">
          <h1 className="text-2xl font-semibold uppercase mb-0.5">Head Office</h1>
          <p>Mirpur, Dhaka - 1206, Bangladesh</p>
        </div>

        <div className="mb-4">
          <h1 className="text-2xl font-semibold uppercase mb-0.5">Email</h1>
          <div className="flex">
            <p className="font-semibold mr-1">Office: </p>
            <p>
              <a
                href="mailto:info@newsverse.com"
                className="text-blue-500 hover:underline"
              >
                info@newsverse.com
              </a>
            </p>
          </div>

          <div className="flex">
            <p className="font-semibold mr-1">Advertising Department: </p>
            <p>
              <a
                href="mailto:ad@newsverse.com"
                className="text-blue-500 hover:underline"
              >
                ad@newsverse.com
              </a>
            </p>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-semibold uppercase mb-0.5">Phone</h1>
          <div className="flex">
            <p className="font-semibold mr-1">Office: </p>
            <p>
            <a
              href="tel:+8801733280204"
              className="text-blue-500 hover:underline"
            >
              +8801733280204
            </a>
          </p>
          </div>
        </div>
      </div>
    </>
  );
}
