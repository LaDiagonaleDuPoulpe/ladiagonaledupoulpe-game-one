using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts
{
    /// <summary>
    /// Health of character with hearts.
    /// Each heart gets a health too
    /// </summary>
    public class HeartsHealth : Health
    {
        #region Fields
        private List<Heart> _hearts = new List<Heart>();
        #endregion

        #region Constructors
        public HeartsHealth(params Heart[] hearts)
        {
            if (hearts.Length == 0)
            {
                throw new ArgumentException("Must be at least one heart", "hearts");
            }

            this._hearts.AddRange(hearts);
        }
        #endregion
    }
}
