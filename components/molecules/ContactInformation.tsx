// data
import { client, groq } from "lib/sanity"
import { IoPhonePortraitOutline as PhoneIcon } from "react-icons/io5"
// icons
import { MdOutlineEmail as EmailIcon } from "react-icons/md"

const getData = async () => {
  const data = client
    .fetch(groq`*[_type == 'settings'][0]{email,phone}`)
    .then((data) => {
      return data
    })

  return data
}

const ContactInformation = async () => {
  const data = await getData()

  const cleanPhone = data?.phone?.replace(/[^0-9]/g, "")

  return (
    <ul className="w-full">
      <li className="pb-2">
        <a
          className="email umami--click--email inline-flex flex-row items-center gap-2"
          href={`mailto:${data?.email}`}
        >
          <EmailIcon /> {data?.email}
        </a>
      </li>
      <li className="pt-2">
        <a
          className="phone umami--click--phone inline-flex flex-row items-center gap-2"
          href={`tel:${cleanPhone}`}
        >
          <PhoneIcon /> {data?.phone}
        </a>
      </li>
    </ul>
  )
}

export default ContactInformation
