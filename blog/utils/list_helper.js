const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const count = blogs.reduce((sum, blog) => {
		return sum + blog.likes
	}, 0)
	return count
}

const favoriteBlog = (blogs) => {
	const maxLike = blogs.reduce((max, blog) => {
		return Math.max(max, blog.likes)
	}, -1)

	const mostLikedBlog = blogs.find(blog => blog.likes === maxLike)
	return mostLikedBlog
}

const mostBlogs = (blogs) => {
	let author = ''
	let max_blogs = 0
	blogs.map(result => {
		const filtered_blogs = blogs.filter(blog => blog.author === result.author)
		if (filtered_blogs.length > max_blogs) {
			author = filtered_blogs[0].author
			max_blogs = filtered_blogs.length
		}
	})

	const obj = {
		author: author,
		blogs: max_blogs
	}

	return obj
}

const mostLikes = (blogs) => {
	let max_likes = 0
	let author = ''

	blogs.map(result => {
		const filtered_blogs = blogs.filter(blog => blog.author === result.author)
		const likes = filtered_blogs.reduce((sum, blog) => {
			return sum + blog.likes
		}, 0)

		if (likes > max_likes) {
			author = result.author
			max_likes = likes
		}
	})

	const obj = {
		author: author,
		likes: max_likes
	}

	return obj
}


module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
