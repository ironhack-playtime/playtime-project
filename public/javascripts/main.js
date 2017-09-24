$(function() {
// console.log($(".new-coment").css("display"))
// const id=$(".new-coment2").attr("data-id")
// console.log(id)
$(".new-coment2").on("click",event=>{
    event.preventDefault();
    if ($(".new-coment").css("display")=="none")
    $(".new-coment").css("display", "block")
    else
    $(".new-coment").css("display", "none")
})
$(".create-comment").on("click","submit",function (e){
e.preventDefault();

$.ajax({
method:"POST",
url:`/dashboard/${id}/new-comment`,
dataType:'json',

}).then(console.log("yupiiii"))


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
