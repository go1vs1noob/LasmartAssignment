using System.ComponentModel.DataAnnotations;

namespace server.Models.DTOs
{
	public class PatchPointDTO
	{
        [Required]
        public int Id { get; set; }
        [Required]
		public int X { get; set; }
		[Required]
		public int Y { get; set; }
	}
}
