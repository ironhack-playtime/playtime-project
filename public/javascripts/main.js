
 $(function() {
    // console.log($(".new-coment").css("display"))
    // const id=$(".new-coment2").attr("data-id")
    // console.log(id)
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
    }).then($(".comments-ol-"+id).append(`<li ><span class="tab">${data.comment}</span></a></li> <a class="deleting-comment" href="#">Delete comment</a>`));
    //problems with deletind and comment_id (we dont have it jet)
    })
 $(".add-player").on("click",event=>{
    event.preventDefault(); 
    console.log("lo pillo")
    const idm=$(".add-player").attr("match-id")
    console.log(idm)
    $.get(`/dashboard/view/${idm}/new-player`)
    $(".add-player").parent().closest("div").parent().closest("div").appendTo(".mine")
})
$(".delete-player").on("click",event=>{
    event.preventDefault(); 
    console.log("lo pillo")
    const idc=$("delete-player").attr("match-id")
    console.log(idm)
    $.get(`/dashboard/view/${idc}/deletemyself`)
    $(".add-player").parent().closest("div").parent().closest("div").appendTo(".others")
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
