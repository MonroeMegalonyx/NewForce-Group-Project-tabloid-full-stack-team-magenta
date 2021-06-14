using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tabloid.Repositories;
using Tabloid.Models;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepository;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepository = tagRepository;
        }

        // GET: api/<TagController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_tagRepository.GetAllTags());
        }

        // GET api/<TagController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TagController>
        [HttpPost]
        public IActionResult Post(Tag tag)
        {
            //var currentUserProfile = GetCurrentUserProfile();
            //if (currentUserProfile.UserType.Name != "admin")
            //{
            //    return Unauthorized();
            //}
            //tag.UserProfileId = currentUserProfile.Id;
            _tagRepository.Add(tag);
            return CreatedAtAction(nameof(Get), new { id = tag.Id }, tag);
        }

        // PUT api/<TagController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TagController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _tagRepository.Delete(id);
            return NoContent();
        }
    }
}
