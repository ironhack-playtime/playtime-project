$(function() {
//add comment
 const id=$(".new-coment2").attr("data-id")
 const idc=$(".new-coment2").attr("data-idc")
 
 console.log(id, "el di ")
$(".new-coment2").on("click",event=>{
    event.preventDefault();
    if ($(".new-coment").css("display")=="none")
    $(".new-coment").css("display", "block")
    else
    $(".new-coment").css("display", "none")
})
$(".create-comment").on("click",function (e){
e.preventDefault();
data={comment:document.getElementById("comment-val").value}
$.ajax({
method:"POST",
url:`/dashboard/${id}/new-comment`,
dataType:'json',
data:data
}).then($(".comments-ol").append(`<li><span class="tab">${data.comment}</span></a></li> <a href="/dashboard/${id}/${idc}">Delete comment</a>`));
//problems with deletind and comment_id (we dont have it jet)
})







 })



//  add_comment: (req, res, next) => {
  
  
//      new Comment({
//         _creatorId:req.user.id,
//         description:req.body.comment
//       })
//       .save()
//       .then(comment => {
//         Match.findByIdAndUpdate(req.params.id, {
//           $push: {"comments": comment._id}
//         })
//         .then(match => res.redirect('/dashboard')); })
//       .catch(e =>   
//          res.render("comments/new-comment", {
//         user: req.user,
//         message: "Something went wrong"
//       }));
//   },
