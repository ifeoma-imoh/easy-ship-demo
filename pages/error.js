import React from 'react'
import { useRouter } from 'next/router'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function Error() {
    const router = useRouter()
    console.log(router.query);
  return (
    <div className="rounded-md bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Attention needed</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
            {router.query.message}
            </p>
            <p>
                <Link href="/" className="text-blue-500">Back to store</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Error