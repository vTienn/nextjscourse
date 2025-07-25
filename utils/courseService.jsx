const API_URL = 'https://q28s8f-8080.csb.app/courses'

export const getCourse = async () => {
  const res = await fetch(API_URL, {
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error('Failed to add course')
  }

  return await res.json()
}
export const getCourseByID = async (id) => {
  const res = await fetch(`${API_URL}?id=${id}`, {
    method: 'GET',
  })
  if (!res.ok) {
    throw new Error('Failed to add course')
  }

  return await res.json()
}
export const addCourse = async (course) => {
  const newCourse = {
    ...course,
    id: String(Date.now() + 1),

    duration: course.duration + ' hours',
  }

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCourse),
  })

  if (!res.ok) {
    throw new Error('Failed to add course')
  }

  return await res.json()
}

export const deleteCourse = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!res.ok) {
    throw new Error('Failed to delete course')
  }
}

export const updateCourse = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  })

  if (!res.ok) {
    throw new Error('Failed to update course')
  }

  return await res.json()
}
// import { courses } from './courses'

// // Lấy tất cả khóa học
// export const getCourse = async () => {
//   return courses
// }

// // Lấy khóa học theo id
// export const getCourseByID = async (id) => {
//   return courses.find((course) => course.id === id)
// }

// // Thêm khóa học mới
// export const addCourse = async (course) => {
//   const newCourse = {
//     ...course,
//     id: String(Date.now()),
//     duration: course.duration + ' hours',
//   }
//   courses.unshift(newCourse)
//   return newCourse
// }

// // Xoá khóa học theo id
// export const deleteCourse = async (id) => {
//   const index = courses.findIndex((c) => c.id === id)
//   if (index !== -1) {
//     courses.splice(index, 1)
//   }
// }

// // Cập nhật khóa học
// export const updateCourse = async (id, updatedData) => {
//   const index = courses.findIndex((c) => c.id === id)
//   if (index !== -1) {
//     courses[index] = { ...courses[index], ...updatedData }
//     return courses[index]
//   }
// }
